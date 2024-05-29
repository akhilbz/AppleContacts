from django.db import models

# Create your models here.

class List(models.Model):
    name = models.CharField(max_length=255)
    
    def __str__(self):
        return f"List(id={self.id}, name={self.name})"
    class Meta:
        db_table = 'lists'
    
class Contact(models.Model):
    full_name = models.JSONField()
    company = models.CharField(max_length=255)
    photo_path = models.TextField()
    phone_no = models.JSONField()
    email = models.JSONField()
    
    class Meta:
        db_table = 'contacts_contact'

class ListContact(models.Model):
    list = models.ForeignKey(List, on_delete=models.CASCADE, db_column='list_id')
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE, db_column='contact_id')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"ListContact(id={self.id}, list={self.list}, contact={self.contact}, created_at={self.created_at}, updated_at={self.updated_at})"
    class Meta:
        db_table = 'list_contacts'
        unique_together = ('list', 'contact')

    class Meta:
        db_table = 'list_contacts' 