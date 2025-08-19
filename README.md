

# 📈 Stock Prediction Portal

A web application that predicts stock prices using machine learning models, with a backend built in Django and a frontend developed in React.

---

## 🛠️ Technologies Used

### Backend:

* **Django**: Python web framework for building the backend.
* **Django REST Framework**: For creating RESTful APIs.
* **Machine Learning**: Utilizes models for stock price prediction.

### Frontend:

* **React**: JavaScript library for building user interfaces.
* **CSS**: Styling for the frontend components.

### Database:

* **SQLite**: Default database used by Django.

### Development Tools:

* **Jupyter Notebook**: For developing and testing machine learning models.

---

## 🚀 Features

* **Stock Price Prediction**: Predicts future stock prices based on historical data.
* **Interactive UI**: User-friendly interface to interact with the application.
* **Real-Time Data**: Fetches live stock data for accurate predictions.
* **Visualization**: Displays prediction results with graphs and charts.

---

## 📦 Installation

### Clone the Repository

```bash
git clone https://github.com/develse/Stock-prediction-Portal-Django-React.git
cd Stock-prediction-Portal-Django-React
```

### Backend Setup

1. **Create and Activate Virtual Environment**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use: venv\Scripts\activate
   ```

2. **Install Dependencies**

   ```bash
   pip install -r backend/requirements.txt
   ```

3. **Apply Migrations**

   ```bash
   cd backend
   python manage.py migrate
   ```

4. **Run the Django Development Server**

   ```bash
   python manage.py runserver
   ```

   The backend will be running at `http://127.0.0.1:8000/`.

### Frontend Setup

1. **Navigate to Frontend Directory**

   ```bash
   cd frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start the React Development Server**

   ```bash
   npm start
   ```

   The frontend will be running at `http://localhost:3000/`.

---

## 📊 Usage

* **Access the Application**: Open your browser and go to `http://localhost:3000/`.
* **Enter Stock Symbol**: Input a valid stock ticker symbol (e.g., AAPL for Apple).
* **View Predictions**: See the predicted stock prices and related charts.




