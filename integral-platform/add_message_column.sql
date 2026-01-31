
-- Add message column to leads table
ALTER TABLE leads 
ADD COLUMN message text;

-- Optional: Add a phone column if you want to store it separately in the future
ALTER TABLE leads 
ADD COLUMN phone text;
