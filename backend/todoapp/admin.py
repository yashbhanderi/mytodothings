from django.contrib import admin
from .models import TodoList, User


class TodoAdmin(admin.ModelAdmin):

    list_display = ('id', 'user', 'task', 'status', 'priority', 'date')


admin.site.register(TodoList, TodoAdmin)
