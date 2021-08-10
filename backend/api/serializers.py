from rest_framework import serializers
from todoapp.models import TodoList

from dj_rest_auth.registration.serializers import RegisterSerializer

# -----------------------------------------------------------------------


class TodoListSerializer(serializers.ModelSerializer):

    class Meta:
        model = TodoList
        fields = ('id', 'task', 'priority', 'status', 'user')
