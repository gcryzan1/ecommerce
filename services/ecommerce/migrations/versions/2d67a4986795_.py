"""empty message

Revision ID: 2d67a4986795
Revises: 1fe570528255
Create Date: 2019-06-08 23:02:54.146351

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2d67a4986795'
down_revision = '1fe570528255'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('vendas',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('data', sa.DateTime(), nullable=False),
    sa.Column('valor', sa.Float(), nullable=False),
    sa.Column('cliente_login', sa.String(length=120), nullable=False),
    sa.ForeignKeyConstraint(['cliente_login'], ['clientes.login'], onupdate='RESTRICT', ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('vendas')
    # ### end Alembic commands ###
