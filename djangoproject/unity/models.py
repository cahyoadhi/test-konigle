from django.db import models
from django.utils import timesince

# Create your models here.
class Subscriber(models.Model):
    SUBSCRIBE_STATS = [("Subscribed", 'Subscribed'),
    ("Unsubscribed", 'Unsubscribed'),
    ]
    email = models.CharField(max_length=50)
    added_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(choices=SUBSCRIBE_STATS, default="Subscribed",max_length=20)

    def __str__(self):
        return self.email

    @property
    def timesince(self):
        return timesince.timesince(self.added_at)+" ago"