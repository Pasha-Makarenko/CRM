import { Test, TestingModule } from "@nestjs/testing"
import { SubordinationController } from "./subordination.controller"

describe("SubordinationController", () => {
  let controller: SubordinationController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ SubordinationController ]
    }).compile()

    controller = module.get<SubordinationController>(SubordinationController)
  })

  it("should be defined", () => {
    expect(controller).toBeDefined()
  })
})
