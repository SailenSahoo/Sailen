fetch_issues_query = """
SELECT 
    p.pname AS project_name,
    pk.project_key,
    j.issuenum,
    j.summary,
    issuestatus.pname AS status,
    priority.pname AS priority
FROM
    project_key pk
JOIN
    project p ON pk.project_id = p.id
JOIN
    jiraissue j ON j.project = p.id
LEFT JOIN
    issuestatus ON j.issuestatus = issuestatus.id
LEFT JOIN
    priority ON j.priority = priority.id
WHERE
    j.summary IS NOT NULL
FETCH FIRST 50 ROWS ONLY
"""
