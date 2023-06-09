# Generated by Django 4.1.7 on 2023-04-30 05:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecom_api', '0002_alter_order_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='total_price',
            field=models.DecimalField(blank=True, decimal_places=2, default=200, max_digits=8, verbose_name='total price'),
            preserve_default=False,
        ),
    ]
