from celery import shared_task
from django.core.mail import send_mail
from djangoproject import settings
from unity.models import Subscriber
from django.template.loader import render_to_string
from django.db.models.functions import ExtractMonth
from datetime import datetime

@shared_task(bind=True)
def send_mail_func(self):
    mail_subject = "Statistics Unity Apps"
    email_list = Subscriber.objects.all().count()
    new_this_month = Subscriber.objects.values(month=ExtractMonth('added_at')).filter(month=datetime.now().month).count()
    unsubscribe = Subscriber.objects.filter(status='Unsubscribed').count()
    send_mail(
        subject = mail_subject,
        message="",
        html_message = render_to_string('send_email.html', {'email_list': email_list, 'new_this_month': new_this_month,'unsubscribe':unsubscribe}),
        from_email=settings.EMAIL_HOST_USER,
        recipient_list=[settings.EMAIL_RECIPIENT],
        fail_silently=False,
    )

