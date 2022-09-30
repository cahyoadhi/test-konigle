from unity.models import Subscriber
from rest_framework.response import Response
from unity.serializers import SubscriberSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.generic import TemplateView

class CustomerView(TemplateView):
    template_name = "index.html"

class ApiOverview(APIView):
    # 1. List all
    def get(self, request, *args, **kwargs):
        api_urls = {
        'API - Overview' : request.build_absolute_uri('/api/'),
        'Email List [GET-POST]' : request.build_absolute_uri('email_list'),
        }
        return Response(api_urls)

class SubscriberView(APIView):
    def get(self, request, *args, **kwargs):
        data = Subscriber.objects.all().order_by('-added_at')
        serializer = SubscriberSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = SubscriberSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

