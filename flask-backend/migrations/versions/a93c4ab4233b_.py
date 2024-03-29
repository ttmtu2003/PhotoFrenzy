"""empty message

Revision ID: a93c4ab4233b
Revises: 8f7b50592377
Create Date: 2023-04-30 12:38:13.255608

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a93c4ab4233b'
down_revision = '8f7b50592377'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('post', schema=None) as batch_op:
        batch_op.add_column(sa.Column('photo_data', sa.LargeBinary(), nullable=True))
        batch_op.drop_column('image_url')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('post', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image_url', sa.VARCHAR(length=500), nullable=False))
        batch_op.drop_column('photo_data')

    # ### end Alembic commands ###
