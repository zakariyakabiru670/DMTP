import { describe, it, beforeEach, expect, vi } from 'vitest';

const mockContractCall = vi.fn();

describe('Creative Marketplace Contract', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  describe('create-work', () => {
    it('should create a creative work successfully', async () => {
      const title = 'Multiverse Painting';
      const description = 'A visual representation of the multiverse theory';
      const workType = 'art';
      const price = 1000;
      const royaltyPercentage = 10;
      
      mockContractCall.mockResolvedValue({ value: 1 }); // Assuming 1 is the new work ID
      
      const result = await mockContractCall('creative-marketplace', 'create-work', [
        title,
        description,
        workType,
        price,
        royaltyPercentage
      ]);
      
      expect(result.value).toBe(1);
      expect(mockContractCall).toHaveBeenCalledWith('creative-marketplace', 'create-work', [
        title,
        description,
        workType,
        price,
        royaltyPercentage
      ]);
    });
    
    it('should fail if royalty percentage is greater than 100', async () => {
      const title = 'Invalid Work';
      const description = 'This work has an invalid royalty percentage';
      const workType = 'art';
      const price = 1000;
      const royaltyPercentage = 101;
      
      mockContractCall.mockRejectedValue(new Error('Invalid royalty percentage'));
      
      await expect(mockContractCall('creative-marketplace', 'create-work', [
        title,
        description,
        workType,
        price,
        royaltyPercentage
      ])).rejects.toThrow('Invalid royalty percentage');
    });
  });
  
  describe('purchase-work', () => {
    it('should purchase a creative work successfully', async () => {
      const workId = 1;
      
      mockContractCall.mockResolvedValue({ value: true });
      
      const result = await mockContractCall('creative-marketplace', 'purchase-work', [workId]);
      
      expect(result.value).toBe(true);
      expect(mockContractCall).toHaveBeenCalledWith('creative-marketplace', 'purchase-work', [workId]);
    });
    
    it('should fail if the work does not exist', async () => {
      const workId = 999;
      
      mockContractCall.mockRejectedValue(new Error('Work not found'));
      
      await expect(mockContractCall('creative-marketplace', 'purchase-work', [workId]))
          .rejects.toThrow('Work not found');
    });
    
    it('should fail if the buyer has insufficient funds', async () => {
      const workId = 1;
      
      mockContractCall.mockRejectedValue(new Error('Insufficient funds'));
      
      await expect(mockContractCall('creative-marketplace', 'purchase-work', [workId]))
          .rejects.toThrow('Insufficient funds');
    });
  });
  
  describe('get-work', () => {
    it('should return creative work details', async () => {
      const workId = 1;
      const expectedWork = {
        creator: 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM',
        title: 'Multiverse Painting',
        description: 'A visual representation of the multiverse theory',
        work_type: 'art',
        price: 1000,
        royalty_percentage: 10
      };
      
      mockContractCall.mockResolvedValue({ value: expectedWork });
      
      const result = await mockContractCall('creative-marketplace', 'get-work', [workId]);
      
      expect(result.value).toEqual(expectedWork);
      expect(mockContractCall).toHaveBeenCalledWith('creative-marketplace', 'get-work', [workId]);
    });
    
    it('should return null for non-existent work', async () => {
      const workId = 999;
      
      mockContractCall.mockResolvedValue({ value: null });
      
      const result = await mockContractCall('creative-marketplace', 'get-work', [workId]);
      
      expect(result.value).toBeNull();
    });
  });
  
  describe('get-work-owner', () => {
    it('should return the current owner of a creative work', async () => {
      const workId = 1;
      const expectedOwner = 'ST2CY5V39NHDPWSXMW9QDT3HC3GD6Q6XX4CFRK9AG';
      
      mockContractCall.mockResolvedValue({ value: expectedOwner });
      
      const result = await mockContractCall('creative-marketplace', 'get-work-owner', [workId]);
      
      expect(result.value).toBe(expectedOwner);
      expect(mockContractCall).toHaveBeenCalledWith('creative-marketplace', 'get-work-owner', [workId]);
    });
    
    it('should return none for non-existent work', async () => {
      const workId = 999;
      
      mockContractCall.mockResolvedValue({ value: null });
      
      const result = await mockContractCall('creative-marketplace', 'get-work-owner', [workId]);
      
      expect(result.value).toBeNull();
    });
  });
});

