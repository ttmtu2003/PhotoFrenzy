"""empty message

Revision ID: 4f0ff826ae6f
Revises: a93c4ab4233b
Create Date: 2023-04-30 15:04:08.256180

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4f0ff826ae6f'
down_revision = 'a93c4ab4233b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('bio', sa.String(length=20), nullable=True))
        batch_op.add_column(sa.Column('avatar', sa.LargeBinary(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('avatar')
        batch_op.drop_column('bio')

    # ### end Alembic commands ###
