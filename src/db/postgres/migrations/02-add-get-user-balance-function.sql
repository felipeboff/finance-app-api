CREATE OR REPLACE FUNCTION get_user_balance(uid uuid)
RETURNS TABLE (
  expense NUMERIC(1000, 2),
  earning NUMERIC(1000, 2),
  investment NUMERIC(1000, 2),
  balance NUMERIC(1000, 2)
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) AS expense,
    SUM(CASE WHEN type = 'EARNING' THEN amount ELSE 0 END) AS earning,
    SUM(CASE WHEN type = 'INVESTMENT' THEN amount ELSE 0 END) AS investment,
    (SUM(CASE WHEN type = 'EARNING' THEN amount ELSE 0 END) -
    SUM(CASE WHEN type = 'EXPENSE' THEN amount ELSE 0 END) -
    SUM(CASE WHEN type = 'INVESTMENT' THEN amount ELSE 0 END)) AS balance
  FROM transactions WHERE user_id = uid;
END;
$$ LANGUAGE plpgsql;