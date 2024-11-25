const contractModel = require("./model");
const AppError = require("../../../utlis/appError");
const catchAsync = require("../../../utlis/catchAsync");
// const { v4: uuidv4 } = require("uuid");
const { select } = require("./model");

exports.createContract = catchAsync(async (req, res, next) => {
  const { company_id, service_id, notes_id, period, status, status_reason } =
    req.body;

  const foundCompany = await select("company", "*", { id: company_id });
  if (!foundCompany) {
    return next(
      new AppError(`Company with ID ${company_id} does not exist`, 404)
    );
  }
  const foundService = await select("service", "*", { id: service_id });
  if (!foundService)
    return next(
      new AppError(`Service with ID ${service_id} does not exist`, 404)
    );

  if (notes_id) {
    const foundNote = await select("notes", "*", { id: notes_id });
    if (!foundNote) {
      return next(new AppError(`Note with ID ${notes_id} does not exist`, 404));
    }
  }

  // Add the new asset
  const newContract = await contractModel.createContract(
    company_id,
    service_id,
    notes_id,
    period,
    status,
    status_reason
  );

  res.status(201).json({
    message: "Contract created successfully",
    newContract,
  });
});

exports.updateContract = catchAsync(async (req, res, next) => {
  const { contractId } = req.params;
  const { company_id, service_id, notes_id, period, status, status_reason } =
    req.body;

  if (company_id) {
    const foundCompany = await select("company", "*", { id: company_id });
    if (!foundCompany) {
      return next(
        new AppError(`Company with ID ${company_id} does not exist`, 404)
      );
    }
  }
  if (service_id) {
    const foundService = await select("service", "*", { id: service_id });
    if (!foundService) {
      return next(
        new AppError(`Company with ID ${service_id} does not exist`, 404)
      );
    }
  }
  if (notes_id) {
    const foundNote = await select("notes", "*", { id: notes_id });
    if (!foundNote) {
      return next(new AppError(`Note with ID ${notes_id} does not exist`, 404));
    }
  }
  const data = {
    company_id,
    service_id,
    notes_id,
    period,
    status,
    status_reason,
  };
  const updateContract = await contractModel.updateContract(contractId, data);

  res.status(200).json({
    message: "Contract updated successfully",
    updateContract,
  });
});
