-- Create project_publishing_decisions table for auditing and tracking publishing workflows
CREATE TABLE IF NOT EXISTS project_publishing_decisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES developer_projects(id) ON DELETE CASCADE,
  decision TEXT NOT NULL,
  decision_note TEXT,
  decided_by UUID REFERENCES profiles(id),
  decided_at TIMESTAMPTZ DEFAULT now(),
  next_action TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE project_publishing_decisions ENABLE ROW LEVEL SECURITY;

-- Create policies for decisions
CREATE POLICY "Admins/Founders can manage project publishing decisions"
  ON project_publishing_decisions
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'founder')
    )
  );

CREATE POLICY "Legal can view decisions"
  ON project_publishing_decisions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'founder', 'legal')
    )
  );

CREATE POLICY "Sales can view published summaries"
  ON project_publishing_decisions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role IN ('admin', 'founder', 'legal', 'sales')
    )
  );
