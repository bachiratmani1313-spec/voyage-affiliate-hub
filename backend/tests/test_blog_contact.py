import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Blog API tests
class TestBlogAPI:
    """Blog endpoints"""

    def test_get_all_posts(self):
        r = requests.get(f"{BASE_URL}/api/blog/posts")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) == 6, f"Expected 6 posts, got {len(data)}"

    def test_get_post_by_slug(self):
        r = requests.get(f"{BASE_URL}/api/blog/posts/maldives-paradis-ocean")
        assert r.status_code == 200
        data = r.json()
        assert data["slug"] == "maldives-paradis-ocean"
        assert "title" in data
        assert "content" in data

    def test_get_post_invalid_slug(self):
        r = requests.get(f"{BASE_URL}/api/blog/posts/non-existent-post")
        assert r.status_code == 404

    def test_like_post(self):
        # Get initial likes
        r1 = requests.get(f"{BASE_URL}/api/blog/posts/1")
        # Like the post
        r2 = requests.post(f"{BASE_URL}/api/blog/posts/1/like")
        assert r2.status_code == 200
        data = r2.json()
        assert "likes" in data

    def test_get_comments(self):
        r = requests.get(f"{BASE_URL}/api/blog/posts/1/comments")
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)

    def test_add_comment(self):
        payload = {"author": "TestUser", "content": "Great article about Maldives!"}
        r = requests.post(f"{BASE_URL}/api/blog/posts/1/comments", json=payload)
        assert r.status_code == 200
        data = r.json()
        assert data["author"] == "TestUser"
        assert data["content"] == "Great article about Maldives!"

    def test_add_comment_verify_in_list(self):
        payload = {"author": "VerifyUser", "content": "TEST_comment persistence check"}
        r = requests.post(f"{BASE_URL}/api/blog/posts/2/comments", json=payload)
        assert r.status_code == 200
        # Verify comment appears in list
        r2 = requests.get(f"{BASE_URL}/api/blog/posts/2/comments")
        assert r2.status_code == 200
        comments = r2.json()
        found = any(c["author"] == "VerifyUser" for c in comments)
        assert found, "Comment not found after creation"


class TestContactAPI:
    """Contact form endpoint"""

    def test_contact_submit(self):
        payload = {
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Test Message",
            "message": "This is a test message from automated testing."
        }
        r = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200
        data = r.json()
        assert "success" in str(data).lower() or "message" in data

    def test_contact_missing_fields(self):
        payload = {"name": "Test User"}
        r = requests.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 422
