-- =============================================================================
-- Rental Management System Migration
-- Created: 2026-02-27
-- Description: Complete rental management with tenants, contracts, and payments
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. TENANTS TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE public.tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Basic Information
  full_name text NOT NULL,
  email text,
  phone text NOT NULL,
  id_number text, -- National ID or passport number

  -- Address Information
  current_address jsonb DEFAULT '{}'::jsonb, -- Multilingual support

  -- Professional Information
  profession text,
  employer text,
  monthly_income numeric(10, 2),

  -- References
  tenant_references jsonb DEFAULT '[]'::jsonb, -- Array of reference objects

  -- Additional Information
  notes jsonb DEFAULT '{}'::jsonb, -- Multilingual notes

  -- Status
  status text NOT NULL DEFAULT 'active', -- active, inactive, blacklisted

  -- Timestamps
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes for performance
CREATE INDEX idx_tenants_status ON public.tenants (status);
CREATE INDEX idx_tenants_email ON public.tenants (email);
CREATE INDEX idx_tenants_phone ON public.tenants (phone);
CREATE INDEX idx_tenants_full_name ON public.tenants (full_name);

-- ---------------------------------------------------------------------------
-- 2. RENTAL_CONTRACTS TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE public.rental_contracts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Relations
  tenant_id uuid NOT NULL REFERENCES public.tenants (id) ON DELETE RESTRICT,
  property_id uuid NOT NULL REFERENCES public.properties (id) ON DELETE RESTRICT,

  -- Contract Details
  contract_number text NOT NULL UNIQUE, -- Auto-generated: RC-YYYY-XXXXX
  start_date date NOT NULL,
  end_date date NOT NULL,

  -- Financial Terms
  monthly_rent numeric(10, 2) NOT NULL,
  deposit_amount numeric(10, 2) NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'TRY', -- TRY, USD, EUR, etc.

  -- Payment Terms
  payment_day integer NOT NULL DEFAULT 1, -- Day of month for payment (1-28)
  payment_method text, -- bank_transfer, cash, check, etc.

  -- Contract Terms (Multilingual)
  terms jsonb DEFAULT '{}'::jsonb, -- Special terms in multiple languages

  -- Status
  status text NOT NULL DEFAULT 'active', -- draft, active, expired, terminated
  termination_date date,
  termination_reason jsonb DEFAULT '{}'::jsonb, -- Multilingual

  -- Deposit Status
  deposit_returned boolean DEFAULT false,
  deposit_return_date date,
  deposit_deduction numeric(10, 2) DEFAULT 0,
  deposit_deduction_reason jsonb DEFAULT '{}'::jsonb, -- Multilingual

  -- Timestamps
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_contracts_tenant ON public.rental_contracts (tenant_id);
CREATE INDEX idx_contracts_property ON public.rental_contracts (property_id);
CREATE INDEX idx_contracts_status ON public.rental_contracts (status);
CREATE INDEX idx_contracts_dates ON public.rental_contracts (start_date, end_date);
CREATE INDEX idx_contracts_number ON public.rental_contracts (contract_number);

-- ---------------------------------------------------------------------------
-- 3. RENTAL_PAYMENTS TABLE
-- ---------------------------------------------------------------------------
CREATE TABLE public.rental_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Relations
  contract_id uuid NOT NULL REFERENCES public.rental_contracts (id) ON DELETE CASCADE,

  -- Payment Details
  payment_number text NOT NULL UNIQUE, -- Auto-generated: PAY-YYYY-XXXXX
  due_date date NOT NULL,
  amount numeric(10, 2) NOT NULL,
  currency text NOT NULL DEFAULT 'TRY',

  -- Payment Status
  status text NOT NULL DEFAULT 'pending', -- pending, paid, overdue, partial, waived
  paid_date date,
  paid_amount numeric(10, 2) DEFAULT 0,

  -- Payment Method
  payment_method text, -- bank_transfer, cash, check, etc.
  transaction_reference text, -- Bank reference or check number

  -- Notes (Multilingual)
  notes jsonb DEFAULT '{}'::jsonb,

  -- Late Fees
  late_fee numeric(10, 2) DEFAULT 0,
  late_fee_applied boolean DEFAULT false,

  -- Timestamps
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_payments_contract ON public.rental_payments (contract_id);
CREATE INDEX idx_payments_status ON public.rental_payments (status);
CREATE INDEX idx_payments_due_date ON public.rental_payments (due_date);
CREATE INDEX idx_payments_number ON public.rental_payments (payment_number);

-- ---------------------------------------------------------------------------
-- 4. PAYMENT_REMINDERS TABLE (Optional - for automation)
-- ---------------------------------------------------------------------------
CREATE TABLE public.payment_reminders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Relations
  payment_id uuid NOT NULL REFERENCES public.rental_payments (id) ON DELETE CASCADE,

  -- Reminder Details
  reminder_date date NOT NULL,
  reminder_type text NOT NULL, -- email, sms, notification

  -- Status
  sent boolean DEFAULT false,
  sent_at timestamptz,

  -- Template (Multilingual)
  message jsonb DEFAULT '{}'::jsonb,

  -- Timestamps
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX idx_reminders_payment ON public.payment_reminders (payment_id);
CREATE INDEX idx_reminders_date ON public.payment_reminders (reminder_date);
CREATE INDEX idx_reminders_sent ON public.payment_reminders (sent);

-- =============================================================================
-- 5. HELPER FUNCTIONS
-- =============================================================================

-- Function to auto-generate contract numbers
CREATE OR REPLACE FUNCTION generate_contract_number()
RETURNS text AS $$
DECLARE
  new_number text;
  counter integer;
  year_part text;
BEGIN
  year_part := to_char(now(), 'YYYY');

  -- Get the count of contracts this year
  SELECT COUNT(*) + 1 INTO counter
  FROM rental_contracts
  WHERE contract_number LIKE 'RC-' || year_part || '-%';

  new_number := 'RC-' || year_part || '-' || LPAD(counter::text, 5, '0');

  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- Function to auto-generate payment numbers
CREATE OR REPLACE FUNCTION generate_payment_number()
RETURNS text AS $$
DECLARE
  new_number text;
  counter integer;
  year_part text;
BEGIN
  year_part := to_char(now(), 'YYYY');

  -- Get the count of payments this year
  SELECT COUNT(*) + 1 INTO counter
  FROM rental_payments
  WHERE payment_number LIKE 'PAY-' || year_part || '-%';

  new_number := 'PAY-' || year_part || '-' || LPAD(counter::text, 5, '0');

  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON public.tenants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contracts_updated_at BEFORE UPDATE ON public.rental_contracts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.rental_payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Trigger to auto-generate contract numbers
CREATE OR REPLACE FUNCTION set_contract_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.contract_number IS NULL OR NEW.contract_number = '' THEN
    NEW.contract_number := generate_contract_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_contract_number BEFORE INSERT ON public.rental_contracts
  FOR EACH ROW EXECUTE FUNCTION set_contract_number();

-- Trigger to auto-generate payment numbers
CREATE OR REPLACE FUNCTION set_payment_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.payment_number IS NULL OR NEW.payment_number = '' THEN
    NEW.payment_number := generate_payment_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER auto_payment_number BEFORE INSERT ON public.rental_payments
  FOR EACH ROW EXECUTE FUNCTION set_payment_number();

-- Function to automatically create monthly payments for a contract
CREATE OR REPLACE FUNCTION create_rental_payments(
  p_contract_id uuid,
  p_start_date date,
  p_end_date date,
  p_monthly_rent numeric,
  p_payment_day integer,
  p_currency text
)
RETURNS void AS $$
DECLARE
  v_current_date date;
  v_payment_date date;
BEGIN
  v_current_date := p_start_date;

  WHILE v_current_date <= p_end_date LOOP
    -- Calculate payment date (use the payment_day)
    v_payment_date := make_date(
      EXTRACT(YEAR FROM v_current_date)::integer,
      EXTRACT(MONTH FROM v_current_date)::integer,
      LEAST(p_payment_day, 28) -- Max day is 28 to avoid month-end issues
    );

    -- Insert payment record
    INSERT INTO rental_payments (
      contract_id,
      due_date,
      amount,
      currency,
      status
    ) VALUES (
      p_contract_id,
      v_payment_date,
      p_monthly_rent,
      p_currency,
      'pending'
    );

    -- Move to next month
    v_current_date := v_current_date + interval '1 month';
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Function to check and update overdue payments
CREATE OR REPLACE FUNCTION update_overdue_payments()
RETURNS void AS $$
BEGIN
  UPDATE rental_payments
  SET status = 'overdue'
  WHERE status = 'pending'
    AND due_date < CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;

-- =============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rental_contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rental_payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_reminders ENABLE ROW LEVEL SECURITY;

-- Tenants: Authenticated users can manage all tenants
CREATE POLICY "Authenticated users can view tenants"
  ON public.tenants FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert tenants"
  ON public.tenants FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update tenants"
  ON public.tenants FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete tenants"
  ON public.tenants FOR DELETE
  TO authenticated
  USING (true);

-- Rental Contracts: Authenticated users can manage all contracts
CREATE POLICY "Authenticated users can view contracts"
  ON public.rental_contracts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert contracts"
  ON public.rental_contracts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update contracts"
  ON public.rental_contracts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete contracts"
  ON public.rental_contracts FOR DELETE
  TO authenticated
  USING (true);

-- Rental Payments: Authenticated users can manage all payments
CREATE POLICY "Authenticated users can view payments"
  ON public.rental_payments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert payments"
  ON public.rental_payments FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update payments"
  ON public.rental_payments FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete payments"
  ON public.rental_payments FOR DELETE
  TO authenticated
  USING (true);

-- Payment Reminders: Authenticated users can manage all reminders
CREATE POLICY "Authenticated users can view reminders"
  ON public.payment_reminders FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert reminders"
  ON public.payment_reminders FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update reminders"
  ON public.payment_reminders FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete reminders"
  ON public.payment_reminders FOR DELETE
  TO authenticated
  USING (true);

-- =============================================================================
-- 7. VIEWS FOR REPORTING
-- =============================================================================

-- View: Active Contracts with Tenant and Property Details
CREATE OR REPLACE VIEW active_contracts_view AS
SELECT
  rc.id,
  rc.contract_number,
  rc.start_date,
  rc.end_date,
  rc.monthly_rent,
  rc.currency,
  rc.status,
  t.full_name AS tenant_name,
  t.phone AS tenant_phone,
  t.email AS tenant_email,
  p.name AS property_name,
  p.location AS property_location,
  p.slug AS property_slug
FROM rental_contracts rc
JOIN tenants t ON rc.tenant_id = t.id
JOIN properties p ON rc.property_id = p.id
WHERE rc.status = 'active';

-- View: Overdue Payments Summary
CREATE OR REPLACE VIEW overdue_payments_view AS
SELECT
  rp.id,
  rp.payment_number,
  rp.due_date,
  rp.amount,
  rp.currency,
  rc.contract_number,
  t.full_name AS tenant_name,
  t.phone AS tenant_phone,
  p.name AS property_name,
  CURRENT_DATE - rp.due_date AS days_overdue
FROM rental_payments rp
JOIN rental_contracts rc ON rp.contract_id = rc.id
JOIN tenants t ON rc.tenant_id = t.id
JOIN properties p ON rc.property_id = p.id
WHERE rp.status = 'overdue'
ORDER BY rp.due_date ASC;

-- View: Monthly Revenue Report
CREATE OR REPLACE VIEW monthly_revenue_view AS
SELECT
  EXTRACT(YEAR FROM rp.due_date) AS year,
  EXTRACT(MONTH FROM rp.due_date) AS month,
  rp.currency,
  COUNT(*) AS total_payments,
  SUM(rp.amount) AS expected_revenue,
  SUM(CASE WHEN rp.status = 'paid' THEN rp.paid_amount ELSE 0 END) AS collected_revenue,
  SUM(CASE WHEN rp.status = 'overdue' THEN rp.amount ELSE 0 END) AS overdue_revenue
FROM rental_payments rp
GROUP BY year, month, rp.currency
ORDER BY year DESC, month DESC;

-- =============================================================================
-- NOTES:
-- =============================================================================
-- After running this migration:
-- 1. Add translation keys to your i18n files for rental management
-- 2. Create frontend components following the patterns in /src/pages/admin/
-- 3. Set up a cron job (Supabase Edge Function) to run update_overdue_payments()
-- 4. Configure email templates for payment reminders
-- 5. Consider adding a notification system integration
-- =============================================================================
