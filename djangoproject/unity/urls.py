from django.urls import path
from unity import views

urlpatterns = [
    path('', views.CustomerView.as_view(), name = "customerview"),
    path('api/', views. ApiOverview.as_view(), name = "api-overview"),
    path('api/email_list/',views.SubscriberView.as_view(), name = "email-list"),
]   