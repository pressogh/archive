# < boardapp/forms.py >

from django import forms
from .models import Post, Comment


class PostUploadForm(forms.ModelForm):
    class Meta:
        model = Post  # 사용할 모델
        fields = ['title', 'content']  # PostForm에서 사용할 Post 모델의 속성

        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control'}),
            'content': forms.Textarea(attrs={'class': 'form-control'})
        }


class CommentUploadForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ('content', )

        widgets = {
            'content': forms.Textarea(attrs={'class': 'form-control'})
        }