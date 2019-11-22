CREATE TABLE [dbo].[Employees] (
    [EmployeeId]     BIGINT         IDENTITY (1, 1) NOT NULL,
    [FirstName]      NVARCHAR (MAX) NULL,
    [LastName]       NVARCHAR (MAX) NULL,
    [DateOfBirth]    DATETIME2 (7)  NOT NULL,
    [PhoneNumber]    NVARCHAR (MAX) NULL,
    [Email]          NVARCHAR (MAX) NULL,
    [CompanyId]      INT            NULL,
    [CreatedOn]      DATETIME2 (7)  DEFAULT (getdate()) NOT NULL,
    [CreatedBy]      NVARCHAR (MAX) DEFAULT ('System') NOT NULL,
    [UpdatedOn]      DATETIME2 (7)  DEFAULT (getdate()) NOT NULL,
    [UpdatedBy]      NVARCHAR (MAX) DEFAULT ('System') NOT NULL,
    [Active]         BIT            DEFAULT ((0)) NOT NULL,
    [NullableActive] BIT            NULL,
    [NullableDate]   DATETIME2 (7)  NULL,
    CONSTRAINT [PK_Employees] PRIMARY KEY CLUSTERED ([EmployeeId] ASC)
);

