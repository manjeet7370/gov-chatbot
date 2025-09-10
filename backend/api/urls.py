from django.contrib import admin
from django.urls import path
from api.views import HealthView, RootView, ChatView, RegisterView, ProfileView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("admin/", admin.site.urls),

    # ✅ custom apis
    path("api/health/", HealthView.as_view()),
    path("api/", RootView.as_view()),
    path("api/chat/", ChatView.as_view()),
    path("api/register/", RegisterView.as_view()),
    path("api/profile/", ProfileView.as_view()),

    # ✅ JWT endpoints
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
