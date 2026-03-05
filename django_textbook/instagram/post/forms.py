from django import forms
from .models import Post

class NewPostForm(forms.ModelForm):
  class Meta:
    model = Post
    fields = ["caption", "image"]

    widgets = {
      "caption": forms.Textarea(attrs={
          'style': 'width: 100%',
          'class': 'form-control'
      }),
      "image": forms.FileInput(attrs={
          'class': 'form-control',
          'type': 'file',
      }),
    }