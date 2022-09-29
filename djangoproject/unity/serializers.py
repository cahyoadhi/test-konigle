from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from unity.models import Subscriber

class SubscriberSerializer(serializers.ModelSerializer):
    timesince = serializers.ReadOnlyField()
    email = serializers.EmailField(validators=[UniqueValidator(queryset=Subscriber.objects.all())])

    class Meta:
        model = Subscriber
        fields = ('email','timesince','added_at','status')
    
