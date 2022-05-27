from django.urls import path
from . import views

app_name = 'Recommend'
urlpatterns = [
    path('one/<str:userId>', views.recommendProblemOne, name='recommend_problem_one'),
    path('all',views.recommendProblemAll),
    path('updatefiles',views.updateFiles)
]
