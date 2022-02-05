from django.db import models
from django.contrib.auth.models import User
from django.db.models.deletion import CASCADE

class TodoList(models.Model):

    STATUS_CHOICES = [
        ('C', 'Completed'),
        ('P', 'Pending'),
    ]

    PRIORITY_CHOICES = [
        ('1', '1️⃣'),
        ('2', '2️⃣'),
        ('3', '3️⃣'),
        ('4', '4️⃣'),
        ('5', '5️⃣'),
        ('6', '6️⃣'),
        ('7', '7️⃣'),
        ('8', '8️⃣'),
        ('9', '9️⃣'),
        ('10', '🔟'), 
    ]

    user = models.ForeignKey(User, on_delete=CASCADE)
    task = models.CharField(max_length=150)
    date = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=2, choices=STATUS_CHOICES)
    priority = models.CharField(max_length=2, choices=PRIORITY_CHOICES)

    def __str__(self):
        return self.user.username
