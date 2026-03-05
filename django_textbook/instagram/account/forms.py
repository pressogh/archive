from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import User

class SignupForm(UserCreationForm):
    password1 = forms.CharField(
        label=('비밀번호'),
        widget=forms.PasswordInput(
            attrs={
                'name': 'password1',
                'style': 'font-size: 20px; height: 50px',
                'class': 'form-control',
                'placeholder': ('비밀번호'),
                'required': 'True',
            }
        )
    )
    password2 = forms.CharField(
        label=('비밀번호 확인'),
        widget=forms.PasswordInput(
            attrs={
                'name': 'password2',
                'style': 'font-size: 20px; height: 50px',
                'class': 'form-control',
                'placeholder': ('비밀번호 확인'),
                'required': 'True',
            }
        )
    )

    class Meta:
        model = User
        fields = ("email", "name", "username", "password1", "password2")

        labels = {
            'email': '이메일',
            'name': '성명',
            'username': '사용자 이름',
            'password1': '비밀번호',
            'password2': '비밀번호 확인',
        }

        widgets = {
            "email": forms.TextInput(attrs={
                'placeholder': '이메일 주소',
                'name': 'email',
                'style': 'font-size: 20px; height: 50px',
                'class': 'form-control'
            }),
            "name": forms.TextInput(attrs={
                'placeholder': '성명',
                'name': 'name',
                'style': 'font-size: 20px; height: 50px',
                'class': 'form-control'
            }),
            "username": forms.TextInput(attrs={
                'placeholder': '사용자 이름',
                'name': 'username',
                'style': 'font-size: 20px; height: 50px',
                'class': 'form-control'
            }),
        }