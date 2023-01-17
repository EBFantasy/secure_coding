import * as chai from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import { User } from '../../entity/User'
import { ValidationError } from '../../lib/validationError'
import { AppDataSource } from '../../lib/typeorm'
import SetPasswordDTO from "../../entity/setPasswordDTO";
import { expect } from 'chai'
import { generateUser } from '../../lib/utils'

chai.use(chaiAsPromised)

describe('User', function () {
  before(async function () {
    // TODO: initialise the datasource (database connection)
    await AppDataSource.initialize()
  })
    
  beforeEach(async function () {
    // TODO: drop the content of the user table between each it().
    const dropTableQuery = " DROP TABLE IF EXISTS users "
    await AppDataSource.query((dropTableQuery))
  })

  describe('validations', function () {
    it('should create a new User in database', async function () {
        await AppDataSource
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          {firstName: "Tom", lastName: "Louis", email: "test1@gmail.com", passwordHash: "123456"}
        ])
        .execute()
      })

    it('should raise error if email is missing', async function () {
      const repo=AppDataSource.getRepository(User)
      const user = new User()
      user.firstName="Weris"
      user.lastName="Tas"
      user.passwordHash="1998810"
      
      await chai.expect(repo.save(user)).to.eventually.be.rejected.and.deep.include({
        target: user,
        property: 'email',
        constraints: { isNotEmpty: 'email should not be empty' }
      })
    })

    it('should raise error is password is not identical', async function () {

      const user = generateUser({ email: "123@test.fr" } as User);
      const promise = user.setPassword(new SetPasswordDTO("test", "test2"))
      await expect(promise).to.eventually.be.rejectedWith(ValidationError, 'password are not identical')
    })


    it('password is properly checked', async function () {

        const user = generateUser({ email: "456@test.fr" } as User);
        await user.setPassword(new SetPasswordDTO("IsP4ssWordStrongEnough", "IsP4ssWordStrongEnough"))
        await expect(user.checkPassword("IsP4ssWordStrongEnough")).to.eventually.be.true;
    })

    it('wrong password when checked', async function () {

        const user = generateUser({ email: "789@test.fr" } as User);
        await user.setPassword(new SetPasswordDTO("IsP4ssWordStrong", "IsP4ssWordStrong"))
        await expect(user.checkPassword("wrongpassword")).to.eventually.be.false;
    })

    it('password is too weak', async function () {

        const user = generateUser();
        const promise = user.setPassword(new SetPasswordDTO("test", "test"))
        await expect(promise).to.eventually.be.rejectedWith(ValidationError, 'password is too weak')
    })
  })
})




