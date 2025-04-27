from fastapi import APIRouter
from fastapi.responses import JSONResponse
from db.connection import get_db_connection
from db.queries import fetch_issues_query

router = APIRouter()

@router.get("/fetch-issues")
def fetch_issues():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(fetch_issues_query)
        rows = cursor.fetchall()
        cursor.close()
        conn.close()

        projects = {}
        for row in rows:
            project_name, project_key, issuenum, summary, status, priority = row
            issue_key = f"{project_key}-{issuenum}"

            if project_name not in projects:
                projects[project_name] = []

            projects[project_name].append({
                "key": issue_key,
                "summary": summary,
                "customFields": {
                    "status": status,
                    "priority": priority
                }
            })

        # Final response
        response = []
        for project, issues in projects.items():
            response.append({
                "name": project,
                "issues": issues
            })

        return JSONResponse(content=response)

    except Exception as e:
        print(f"Error: {str(e)}")
        return JSONResponse(content={"error": str(e)}, status_code=500)
