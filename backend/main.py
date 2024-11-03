from typing import Union
from fastapi import FastAPI, HTTPException, Request
from users import get_users 

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/users")
def return_users(skip: int = 0, limit: int = 5):
    users = get_users() 
    total = len(users)
    processed = users[skip : skip + limit]
    
    return {
        "users": processed,
        "total": total,
        "skip": skip,
        "limit": limit
    }


@app.put("/users/{user_id}")
async def update_user(user_id: int, request: Request):
    users = get_users() 
    user = next((u for u in users if u["id"] == user_id), None)  # Find user by id

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    update_data = await request.json()
    updated_user = user.copy()

    # Apply updates for each field if it exists in the request body
    for key, value in update_data.items():
        if key in updated_user:
            updated_user[key] = value

    return updated_user
