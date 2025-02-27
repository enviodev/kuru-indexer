import assert from "assert";
import { 
  TestHelpers,
  MarginAccount_Deposit
} from "generated";
const { MockDb, MarginAccount } = TestHelpers;

describe("MarginAccount contract Deposit event tests", () => {
  // Create mock db
  const mockDb = MockDb.createMockDb();

  // Creating mock for MarginAccount contract Deposit event
  const event = MarginAccount.Deposit.createMockEvent({/* It mocks event fields with default values. You can overwrite them if you need */});

  it("MarginAccount_Deposit is created correctly", async () => {
    // Processing the event
    const mockDbUpdated = await MarginAccount.Deposit.processEvent({
      event,
      mockDb,
    });

    // Getting the actual entity from the mock database
    let actualMarginAccountDeposit = mockDbUpdated.entities.MarginAccount_Deposit.get(
      `${event.chainId}_${event.block.number}_${event.logIndex}`
    );

    // Creating the expected entity
    const expectedMarginAccountDeposit: MarginAccount_Deposit = {
      id: `${event.chainId}_${event.block.number}_${event.logIndex}`,
      owner: event.params.owner,
      token: event.params.token,
      amount: event.params.amount,
    };
    // Asserting that the entity in the mock database is the same as the expected entity
    assert.deepEqual(actualMarginAccountDeposit, expectedMarginAccountDeposit, "Actual MarginAccountDeposit should be the same as the expectedMarginAccountDeposit");
  });
});
