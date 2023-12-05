from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class User(BaseModel):
    username: str
    password: str

# 仮のデータベースを模倣するためのリスト
fake_users_db = {}

@app.post("/register")
def register_user(user: User):
    if user.username in fake_users_db:
        raise HTTPException(status_code=400, detail="Username already registered")
    fake_users_db[user.username] = user
    return {"username": user.username, "message": "User registered successfully"}

@app.post("/login")
def login_user(user: User):
    if user.username not in fake_users_db or fake_users_db[user.username].password != user.password:
        raise HTTPException(status_code=401, detail="Invalid username or password")
    return {"username": user.username, "message": "Login successful"}
