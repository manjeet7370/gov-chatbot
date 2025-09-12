from django.urls import path
from api.views import HealthView, RootView, ChatView, RegisterView, ProfileView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # ✅ Custom APIs
    path("health/", HealthView.as_view()),
    path("", RootView.as_view()),  # GET http://127.0.0.1:8000/api/
    path("chat/", ChatView.as_view()),
    path("register/", RegisterView.as_view()),
    path("profile/", ProfileView.as_view()),

    # ✅ JWT endpoints
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]