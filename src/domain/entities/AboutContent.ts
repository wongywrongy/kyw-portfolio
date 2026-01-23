/**
 * About Content Domain Entity
 * 
 * This file contains the AboutContent domain entity with business logic
 * and validation rules. It represents the core business object for about page content.
 */

import type { AboutContent as IAboutContent, AboutSection } from '../../shared/types';

/**
 * About Section Domain Entity
 * 
 * Represents a single section within the about page content.
 * Encapsulates business logic and validation for about sections.
 */
export class AboutSectionEntity {
  public readonly title: string;
  public readonly content: string;
  public readonly images?: import('../../shared/types').AboutSectionImage[];

  /**
   * Creates a new AboutSectionEntity instance
   * 
   * @param data - Raw about section data
   * @throws {Error} If validation fails
   */
  constructor(data: AboutSection) {
    this.validateAboutSection(data);
    
    this.title = data.title.trim();
    this.content = data.content.trim();
    this.images = data.images;
  }

  /**
   * Validates the about section data
   * 
   * @param data - About section data to validate
   * @throws {Error} If validation fails
   */
  private validateAboutSection(data: AboutSection): void {
    if (!data.title || data.title.trim().length === 0) {
      throw new Error('About section must have a title');
    }

    if (data.title.length > 100) {
      throw new Error('About section title cannot exceed 100 characters');
    }

    if (!data.content || data.content.trim().length === 0) {
      throw new Error('About section must have content');
    }

    if (data.content.length > 2000) {
      throw new Error('About section content cannot exceed 2000 characters');
    }
  }



  /**
   * Converts the entity to a plain object
   * 
   * @returns Plain object representation
   */
  public toJSON(): AboutSection {
    return {
      title: this.title,
      content: this.content,
      images: this.images,
    };
  }

  /**
   * Creates an AboutSectionEntity instance from plain object data
   * 
   * @param data - Plain object data
   * @returns New AboutSectionEntity instance
   */
  public static fromJSON(data: AboutSection): AboutSectionEntity {
    return new AboutSectionEntity(data);
  }
}

/**
 * About Content Domain Entity
 * 
 * Represents the complete about page content with business logic.
 * Manages the collection of about sections and provides operations
 * for content management and analysis.
 */
export class AboutContent {
  public readonly title: string;
  public readonly sections: AboutSectionEntity[];

  /**
   * Creates a new AboutContent instance
   * 
   * @param data - Raw about content data
   * @throws {Error} If validation fails
   */
  constructor(data: IAboutContent) {
    this.validateAboutContent(data);
    
    this.title = data.title.trim();
    this.sections = data.sections.map(section => new AboutSectionEntity(section));
  }

  /**
   * Validates the about content data
   * 
   * @param data - About content data to validate
   * @throws {Error} If validation fails
   */
  private validateAboutContent(data: IAboutContent): void {
    if (!data.title || data.title.trim().length === 0) {
      throw new Error('About content must have a title');
    }

    if (data.title.length > 100) {
      throw new Error('About content title cannot exceed 100 characters');
    }

    if (!data.sections || data.sections.length === 0) {
      throw new Error('About content must have at least one section');
    }

    if (data.sections.length > 20) {
      throw new Error('About content cannot have more than 20 sections');
    }

    // Validate that all sections have unique titles
    const titles = data.sections.map(section => section.title.toLowerCase());
    const uniqueTitles = new Set(titles);
    if (titles.length !== uniqueTitles.size) {
      throw new Error('About content sections must have unique titles');
    }
  }


  /**
   * Converts the entity to a plain object
   * 
   * @returns Plain object representation
   */
  public toJSON(): IAboutContent {
    return {
      title: this.title,
      sections: this.sections.map(section => section.toJSON()),
    };
  }

  /**
   * Creates an AboutContent instance from plain object data
   * 
   * @param data - Plain object data
   * @returns New AboutContent instance
   */
  public static fromJSON(data: IAboutContent): AboutContent {
    return new AboutContent(data);
  }
}
