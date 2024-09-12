import joblib
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Change this to your frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

model = joblib.load('The_model.pkl')

class UserInputRequest(BaseModel):
    heart_rate: float
    systolic_blood_pressure: float
    diastolic_blood_pressure: float
    oxygen_saturation: float
    resp_rate: float
    temperature: float


@app.post("/predict/")
async def post_user_input(user_input_data: UserInputRequest):
    input_data = pd.DataFrame({
        'Heartrate_min': [user_input_data.heart_rate],
        'BPsys_mmHg': [user_input_data.systolic_blood_pressure],
        'BPdia_mmHG': [user_input_data.diastolic_blood_pressure],
        'O2satur_Finger': [user_input_data.oxygen_saturation],
        'Resp_rate_min': [user_input_data.resp_rate],
        'Body_temp_C': [user_input_data.temperature],
    })
    predictions = model.predict(input_data)
    
    result = int(predictions[0]) if isinstance(predictions[0], str) else predictions[0]
    
    # "Raw Model Prediction:"
    if result == 1:
        return {"pred1": result, "pred": "Abnormal"}
    return {"pred1": result, "pred": "Normal"}
# Run the main function
if __name__ == "__main__":
    # main()
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
