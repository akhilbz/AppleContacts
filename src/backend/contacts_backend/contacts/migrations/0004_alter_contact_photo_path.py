# Generated by Django 5.0.6 on 2024-05-11 14:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("contacts", "0003_alter_contact_company_alter_contact_full_name"),
    ]

    operations = [
        migrations.AlterField(
            model_name="contact",
            name="photo_path",
            field=models.BinaryField(),
        ),
    ]
