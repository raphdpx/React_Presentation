CREATE TABLE [dbo].[Dog]
(
	[DogId]          BIGINT         IDENTITY (1, 1) NOT NULL,
    [FirstName]      NVARCHAR (MAX) NULL,
    [LastName]       NVARCHAR (MAX) NULL,
    [DateOfBirth]    DATETIME2 (7)  NOT NULL,
    [ColorId]        INT            NULL,
    [RaceId]         INT            NULL,
    [Castrated]      BIT            DEFAULT ((0)) NOT NULL,
    [CreatedOn]      DATETIME2 (7)  DEFAULT (getdate()) NOT NULL,
    [CreatedBy]      NVARCHAR (MAX) DEFAULT ('System') NOT NULL,
    [UpdatedOn]      DATETIME2 (7)  DEFAULT (getdate()) NOT NULL,
    [UpdatedBy]      NVARCHAR (MAX) DEFAULT ('System') NOT NULL,
    CONSTRAINT [PK_Dog] PRIMARY KEY CLUSTERED ([DogId] ASC)
)
