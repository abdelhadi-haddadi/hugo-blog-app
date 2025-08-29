+++
title = "ISO 25010 Quality Model"
date = 2025-08-29T20:13:44.072+01:00
draft = false
description = "Comprehensive guide to ISO 25010 quality model: its definition, characteristics, quality attributes, and practical applications in software development. Learn how to implement this standard effectively."
image = ""
imageBig = ""
categories = ["terms-testing"]
authors = ["Cude"]
avatar = "/images/avatar.webp"
+++

# ISO 25010 Quality Model

last modified April 4, 2025

## Definition of ISO 25010

ISO 25010 is an international standard that defines a comprehensive quality
model for software product evaluation. It provides a structured framework for
assessing software quality through measurable characteristics and sub-
characteristics. The standard replaces ISO 9126 and is part of the SQuaRE
(Software product Quality Requirements and Evaluation) series. ISO 25010
categorizes quality attributes into two main groups: product quality and quality
in use. This distinction helps organizations evaluate both the intrinsic
properties of software and its effectiveness in real-world scenarios.

The standard serves as a common language for developers, testers, and
stakeholders to discuss and measure software quality systematically. It enables
objective comparisons between different software solutions and supports quality-
based decision-making throughout the development lifecycle. By providing clear
definitions and relationships between quality attributes, ISO 25010 helps teams
prioritize requirements and validate that software meets intended quality
objectives. Its comprehensive nature makes it applicable across various domains,
from enterprise systems to embedded software.

## Broader Context of ISO 25010

ISO 25010 exists within a broader ecosystem of software quality standards and
practices. It complements other ISO standards like ISO 25000 (SQuaRE series)
which covers quality requirements, measurement, and evaluation processes. The
model aligns with modern software engineering methodologies including Agile,
DevOps, and continuous delivery by providing measurable quality indicators. In
industry contexts, it supports compliance with regulations that mandate specific
quality attributes such as security in healthcare (HIPAA) or reliability in
aviation (DO-178C).

The standard's importance has grown with increasing software complexity and user
expectations. It provides a framework for balancing competing quality demands
like performance versus security or functionality versus maintainability. Many
organizations use ISO 25010 as the foundation for their quality assurance
programs, tailoring it to their specific needs while maintaining alignment with
international best practices. Its systematic approach helps bridge the gap
between technical implementation and business value by translating abstract
quality concepts into measurable outcomes.

## Characteristics of ISO 25010 Quality Model

**Two-dimensional structure** - Evaluates both product quality
(intrinsic attributes) and quality in use (user perspective).
**Hierarchical organization** - Breaks down quality into 8 main
characteristics and 31 sub-characteristics for precise evaluation.
**Standardized metrics** - Provides measurable indicators for
each quality attribute, enabling objective assessment.
**Comprehensive coverage** - Addresses functional and non-
functional requirements across the entire software lifecycle.
**Flexible application** - Adaptable to various software types,
from commercial products to custom enterprise solutions.
**Interrelated attributes** - Recognizes dependencies between
different quality characteristics for balanced evaluation.

## Product Quality Characteristics

The product quality dimension of ISO 25010 focuses on the software's intrinsic
properties, independent of its usage context. These characteristics represent the
technical and structural aspects that developers can directly influence during
design and implementation. The model identifies eight key product quality
characteristics, each with specific sub-characteristics that provide detailed
evaluation criteria. This structured approach enables teams to assess software
quality systematically and identify areas for improvement.

Understanding these characteristics helps organizations make informed decisions
about trade-offs during development. For instance, investing in modularity
(under maintainability) might initially slow development but yield long-term
benefits. Similarly, rigorous security measures might impact performance,
requiring careful balancing. Below is a detailed breakdown of the product
quality characteristics and their sub-characteristics as defined in ISO 25010.

Characteristic
Sub-characteristics
Description

Functional Suitability
Functional completeness, correctness, appropriateness
Measures how well the software provides required functions and accurate
results.

Performance Efficiency
Time behavior, resource utilization, capacity
Evaluates response times, throughput, and resource consumption under
specified conditions.

Compatibility
Co-existence, interoperability
Assesses how well the system works with other systems and shares
information.

Usability
Appropriateness recognizability, learnability, operability, user error
protection, UI aesthetics, accessibility
Focuses on user experience aspects including ease of learning and
operation.

Reliability
Maturity, availability, fault tolerance, recoverability
Measures the system's ability to maintain specified performance levels
under various conditions.

Security
Confidentiality, integrity, non-repudiation, accountability,
authenticity
Evaluates protection against unauthorized access and data breaches.

Maintainability
Modularity, reusability, analyzability, modifiability, testability
Assesses how easily the software can be modified to correct or improve it.

Portability
Adaptability, installability, replaceability
Measures how easily the software can be transferred between different
environments.

## Quality in Use Characteristics

The quality in use dimension evaluates software effectiveness from the end-user
perspective in specific contexts of use. Unlike product quality characteristics
that focus on the software itself, these attributes measure how well the
software helps users achieve their goals in real-world scenarios. This
perspective is particularly valuable for assessing business impact and user
satisfaction, bridging the gap between technical implementation and practical
value.

Quality in use characteristics become especially important in competitive
markets where user experience differentiates products. They also help
organizations justify software investments by demonstrating tangible benefits to
stakeholders. The following table outlines the five quality in use
characteristics defined in ISO 25010, along with their significance in software
evaluation.

Characteristic
Description

Effectiveness
Measures how accurately and completely users achieve specified goals using
the software.

Efficiency
Evaluates resources expended in relation to the accuracy and completeness
of goals achieved.

Satisfaction
Assesses user comfort and positive attitudes towards using the software.

Freedom from risk
Measures reduction in risks to people, business, software, or other
systems.

Context coverage
Evaluates how well the software meets needs across specified contexts of
use.

## Practical Applications of ISO 25010

Implementing ISO 25010 provides numerous benefits throughout the software
development lifecycle. During requirements analysis, it serves as a checklist to
ensure all relevant quality aspects are considered. Teams can use the model to
create weighted quality criteria for vendor selection or product evaluation. In
development, it guides architectural decisions by highlighting trade-offs
between different quality attributes. For testing, it provides a framework for
designing comprehensive test cases that cover all quality dimensions.

The standard also supports continuous improvement by establishing measurable
quality baselines and tracking progress over time. Many organizations integrate
ISO 25010 characteristics into their Definition of Done to ensure quality is
baked into deliverables. In maintenance phases, the model helps prioritize
enhancements by quantifying their impact on various quality attributes. When
used consistently, it fosters a quality-focused culture where technical
decisions align with business objectives and user needs.

## Implementation Best Practices

- **Tailor the model to your context** - Prioritize characteristics most relevant to your domain and user needs.

- **Establish measurable indicators** - Define quantitative metrics for each selected characteristic to enable objective assessment.

- **Balance competing attributes** - Recognize trade-offs (e.g., security vs performance) and make conscious decisions.

- **Integrate with development processes** - Incorporate quality evaluation into all lifecycle phases, not just final testing.

- **Train teams on the standard** - Ensure all stakeholders understand the quality model and its terminology.

- **Review and adapt regularly** - Update quality priorities as business needs, technologies, and user expectations evolve.

## Source

[ISO/IEC 25010:2011 Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — System and software quality models](https://www.iso.org/standard/35733.html)

This comprehensive guide to ISO 25010 has explored its definition, context,
characteristics, and practical applications. By implementing this quality model,
organizations can systematically evaluate and improve their software products to
meet both technical and business objectives effectively.

## Author

My name is Jan Bodnar, and I am a passionate programmer with extensive
programming experience. I have been writing programming articles since 2007,
sharing insights on languages, frameworks, and best practices. To date, I have
authored over 1,400 articles and 8 e-books, covering topics from beginner
tutorials to advanced development techniques. With more than ten years of
experience in teaching programming, I strive to make complex concepts accessible
and practical for learners and professionals alike.

List [all Testing terms](/all/#terms-test).