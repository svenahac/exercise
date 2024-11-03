from typing import Union
from fastapi import FastAPI, HTTPException, Request, Query
from users import get_users 
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your allowed origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/users")
def return_users(skip: int = 0, limit: int = 5, select: str = Query(None)):
    users = get_users() 
    total = len(users)
    processed = users[skip : skip + limit]
    
    # Filter fields if select query parameter is provided
    if select:
        selected_fields = select.split(",")
        filtered = [
            {key: user[key] for key in selected_fields if key in user} for user in processed
        ]
    else:
        filtered = processed  


    return {
        "users": filtered,
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
