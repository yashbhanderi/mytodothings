from todoapp.models import TodoList
from .serializers import TodoListSerializer

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

#------------------------------------- Views ------------------------------------------------------#


# To Do List
class TodoListViewset(viewsets.ModelViewSet):
    # queryset = TodoList.objects.all()
    serializer_class = TodoListSerializer
    permission_classes = IsAuthenticated,
    print("serializer_class")

    def get_queryset(self):
        return TodoList.objects.all().order_by('-status', 'priority')
