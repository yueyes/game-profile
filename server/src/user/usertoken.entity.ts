// @Entity()
// @Index('user_token_user_id_deleted_at_uindex', ['userId', 'type', 'deletedAt'], {unique: true})
// @Index('user_token_user_id_fk', ['userId'])
// @Index('user_token_login_provider_provider_id_fk', ['provider'])
// export class UserToken {
//   @PrimaryGeneratedColumn()
//   tokenId: number;
  
//   @ManyToOne(() => User, {onDelete: 'CASCADE'})
//   @JoinColumn({name: 'user_id'})
//   user: User;
  
//   @Column()
//   userId: number;
  
//   @Column({default: 1})
//   type: number;
  
//   @Column({type: 'text'})
//   token: string;
  
//   @ManyToOne(() => LoginProvider, {onDelete: 'CASCADE'})
//   @JoinColumn({name: 'provider_id'})
//   provider: LoginProvider;
  
//   @Column()
//   providerId: number;
  
//   @Column({nullable: true, type: 'json'})
//   remarks: Record<string, any>;
  
//   @CreateDateColumn()
//   createdAt: Date;
  
//   @UpdateDateColumn()
//   updatedAt: Date;
  
//   @Column({default: () => 'CURRENT_TIMESTAMP'})
//   activatedAt: Date;
  
//   @Column({type: "datetime", default: '2100-01-01 00:00:00'})
//   deletedAt: Date;
// }
