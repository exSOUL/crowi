const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
const expect = chai.expect
const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const faker = require('faker')
const utils = require('../utils.js')
chai.use(chaiAsPromised)
chai.use(sinonChai)

describe('Share', () => {
  const User = utils.models.User
  const Page = utils.models.Page
  const Share = utils.models.Share
  const conn = utils.mongoose.connection
  let user
  let createdPages

  before(async () => {
    await User.remove({})
    const createdUsers = await testDBUtil.generateFixture(conn, 'User', [
      { name: faker.name.findName(), username: faker.internet.userName(), email: faker.internet.email() },
    ])
    user = createdUsers[0]

    await Page.remove({})
    createdPages = await testDBUtil.generateFixture(conn, 'Page', [
      { path: '/' + faker.lorem.slug(), grant: Page.GRANT_PUBLIC, grantedUsers: [user], creator: user },
      { path: '/' + faker.lorem.slug(), grant: Page.GRANT_PUBLIC, grantedUsers: [user], creator: user },
    ])

    await Share.remove({})
  })

  afterEach(async () => {
    await Share.remove({})
  })

  describe('.create', () => {
    context('Create shares', () => {
      it('should be able to create only one active share per page', async () => {
        await expect(Share.create(createdPages[0]._id, user)).to.be.eventually.an.instanceof(Share)
        await expect(Share.create(createdPages[0]._id, user)).to.be.rejected
      })
    })
  })

  describe('.delete', () => {
    context('Delete share', () => {
      let createdShares
      before(async () => {
        createdShares = [await Share.create(createdPages[0]._id, user), await Share.create(createdPages[1]._id, user)]
      })

      it('should inactivate share', async () => {
        const shareId = createdShares[0]._id
        await expect(Share.deleteById(shareId)).to.eventually.have.property('status', Share.STATUS_INACTIVE)
        const pageId = createdShares[1].page
        await expect(Share.deleteByPageId(pageId)).to.eventually.have.property('status', Share.STATUS_INACTIVE)
      })
    })
  })
})
