from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
import json, os


class HealthView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return JsonResponse({"status": "healthy"})


class RootView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return JsonResponse({
            "status": "ok",
            "service": "sih-health-bot",
            "version": "0.1.0"
        })


class ChatView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        user_msg = request.data.get("message", "").lower()

        # load health data json
        data_file = os.path.join(os.path.dirname(__file__), "data", "health_data.json")
        with open(data_file, "r") as f:
            health_data = json.load(f)

        bot_reply = "Sorry, I don't have information about that."

        for disease, info in health_data.items():
            if disease in user_msg:
                bot_reply = (
                    f"🦠 {disease.capitalize()} info:\n"
                    f"Symptoms: {', '.join(info['symptoms'])}\n"
                    f"Prevention: {', '.join(info['prevention'])}\n"
                    f"Treatment: {info['treatment']}"
                )
                break

        return JsonResponse({"user": user_msg, "bot": bot_reply})
