import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pokemons')
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column('simple-array')
  types: string[];

  @Column('jsonb')
  sprites: object;

  @Column('float')
  height: number;

  @Column('float')
  weight: number;

  @Column('simple-array')
  abilities: string[];

  @Column()
  species: string;

  @Column('simple-array')
  egg_groups: string[];

  @Column('int')
  hatch_counter: number;
}
