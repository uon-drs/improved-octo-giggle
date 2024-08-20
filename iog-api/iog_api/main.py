from fastapi import FastAPI
from iog_api import routes

app = FastAPI(
        title="improved-octo-giggles",
        version="0.1.0",
        summary="Validate your data here",
        )

app.include_router(routes.router)

@app.get("/")
async def root():
    return {"message": "Bring out yer data"}
