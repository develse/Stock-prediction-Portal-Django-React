from django.urls import path
from account import views as UserViews

urlpatterns = [
    path("register/",UserViews.RegisterView.as_view()  ),
]
