import os, json
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status

# =====================
# ✅ Health check API
# =====================
class HealthView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({"status": "healthy"}, status=status.HTTP_200_OK)


# =====================
# ✅ Root info API
# =====================
class RootView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({
            "status": "ok",
            "service": "sih-health-bot",
            "version": "0.1.0",
            "endpoints": {
                "health": "/api/health/",
                "register": "/api/register/",
                "login": "/api/token/",
                "profile": "/api/profile/",
                "chat": "/api/chat/"
            }
        }, status=status.HTTP_200_OK)


# =====================
# ✅ Register new user
# =====================
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        # validations
        if not username or not password:
            return Response(
                {"error": "Username and password are required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(username=username).exists():
            return Response(
                {"error": "Username already taken"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # create user (Django automatically hashes the password)
        user = User.objects.create_user(username=username, email=email, password=password)

        return Response(
            {"message": "User registered successfully ✅", "username": user.username},
            status=status.HTTP_201_CREATED
        )


# =====================
# ✅ Protected profile API
# =====================
class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "username": user.username,
            "email": user.email,
            "message": "You are authenticated ✅"
        }, status=status.HTTP_200_OK)


# =====================
# ✅ ChatBot API
# =====================
class ChatView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user_msg = request.data.get("message", "").lower().strip()
        lang = request.data.get("lang", "en")  # default English

        # path to health_data.json
        data_file = os.path.join(settings.BASE_DIR, "api", "data", "health_data.json")

        if not os.path.exists(data_file):
            return Response(
                {"error": "Health data file not found"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        with open(data_file, "r", encoding="utf-8") as f:
            health_data = json.load(f)

        bot_reply = "❌ Sorry, I don't have information about that."

        for disease, info in health_data.items():
            if disease in user_msg:
                symptoms = info["symptoms"].get(lang, info["symptoms"]["en"])
                prevention = info["prevention"].get(lang, info["prevention"]["en"])
                treatment = info["treatment"].get(lang, info["treatment"]["en"])
                emergency = info["emergency"].get(lang, info["emergency"]["en"])

                if lang == "hi":
                    bot_reply = (
                        f"🦠 {disease.capitalize()} जानकारी:\n"
                        f"लक्षण: {', '.join(symptoms)}\n"
                        f"बचाव: {', '.join(prevention)}\n"
                        f"उपचार: {treatment}\n"
                        f"आपातकालीन नंबर: {emergency}"
                    )
                else:
                    bot_reply = (
                        f"🦠 {disease.capitalize()} info:\n"
                        f"Symptoms: {', '.join(symptoms)}\n"
                        f"Prevention: {', '.join(prevention)}\n"
                        f"Treatment: {treatment}\n"
                        f"Emergency: {emergency}"
                    )
                break

        return Response({
            "user": user_msg,
            "bot": bot_reply,
            "lang": lang
        }, status=status.HTTP_200_OK)