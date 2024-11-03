import pytest
from fastapi.testclient import TestClient
from main import app  # Import your FastAPI app

client = TestClient(app)

def test_return_users():
    # Test without any query parameters
    response = client.get("/users")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 5 # Check that there are 5 users
    assert "id" in data["users"][0]  # Check that the first user has an 'id' field

    # Test with skip and limit query parameters
    response = client.get("/users?skip=1&limit=2")
    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 5
    assert len(data["users"]) == 2
    assert data["users"][0]["id"] == 2  # Ensure the second user is returned

    # Test with selecting specific fields
    response = client.get("/users?select=id,firstName&limit=3")
    assert response.status_code == 200
    data = response.json()
    assert len(data["users"]) == 3
    assert "lastName" not in data["users"][0]  # Check that lastName is not included
    assert "id" in data["users"][0]  # Check that id is included

def test_update_user():
    # Test updating a user
    response = client.put("/users/2", json={"lastName": "Owais"})
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == 2
    assert data["lastName"] == "Owais"  # Check that the last name is updated

    # Test updating a non-existent user
    response = client.put("/users/100", json={"lastName": "Unknown"})
    assert response.status_code == 404
    assert response.json()["detail"] == "User not found"
