from datetime import datetime, timedelta

def suggest_post_date():
    return (datetime.now() + timedelta(days=2)).strftime("%Y-%m-%d")
