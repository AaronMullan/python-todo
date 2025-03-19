# FastAPI TODO

A simple FastAPI backend for a Todo application, made with Cursor.

Deployed at: https://valiant-communication-production.up.railway.app/docs

## Setup

1. Make sure you have Python 3.8+ installed
2. Activate the virtual environment:
   ```bash
   source .venv/bin/activate  # On Unix/macOS
   # or
   .venv\Scripts\activate  # On Windows
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application

Start the server with:

```bash
uvicorn main:app --reload
```

The application will be available at `http://localhost:8000`

## API Documentation

Once the server is running, you can access:

- Interactive API docs (Swagger UI): `http://localhost:8000/docs`
- Alternative API docs (ReDoc): `http://localhost:8000/redoc`

## Available Endpoints

- `GET /`: Welcome message
- `GET /items/{item_id}`: Get an item by ID
- `POST /items/`: Create a new item
