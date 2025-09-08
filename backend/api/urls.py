from django.urls import path
from .views import HealthView, RootView, ChatView

urlpatterns = [
    path("health/", HealthView.as_view(), name="health"),
    path("", RootView.as_view(), name="root"),
    path("chat/", ChatView.as_view(), name="chat"),
]
